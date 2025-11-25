"use strict";

const axios = require("axios");

module.exports = {
    async create(ctx) {
        try {
            const body = ctx.request.body.data || ctx.request.body;

            // -----------------------------
            // 1️⃣ Save entry in Strapi DB
            // -----------------------------
            const entry = await strapi.entityService.create("api::enquiry.enquiry", {
                data: {
                    fullName: body.fullName,
                    profile: body.profile,
                    email: body.email,
                    countryCode: body.countryCode,
                    phoneNo: body.phoneNo,
                    company: body.company,
                    message: body.message,
                    inquiryType: body.inquiryType,
                    industry: body.industry,
                    enquirySource: body.enquirySource,
                },
            });

            // --------------------------------------
            // 2️⃣ Respond Immediately (NO waiting)
            // --------------------------------------
            ctx.send({
                success: true,
                message: "Enquiry saved successfully.",
                data: entry,
            });

            // ----------------------------------------------------------------
            // 3️⃣ Run Slack + Emails in Background (non-blocking)
            // ----------------------------------------------------------------

            setImmediate(async () => {
                try {
                    // Slack Notification (optional)
                    if (process.env.SLACK_WEBHOOK_URL) {
                        await axios.post(process.env.SLACK_WEBHOOK_URL, {
                            text: `📝 New Enquiry
• Name: ${body.fullName}
• Email: ${body.email}
• Phone: +${body.countryCode} ${body.phoneNo}
• Inquiry Type: ${body.inquiryType}
• Industry: ${body.industry}
• Source: ${body.enquirySource}
• Message: ${body.message}`,
                        });
                        console.log("Slack notification sent in background");
                    }

                    // Thank-you email to USER
                    await strapi.plugin("email").service("email").send({
                        to: body.email,
                        subject: "Thanks for contacting us!",
                        html: `
              <p>Hello <strong>${body.fullName}</strong>,</p>
              <p>Thank you for your enquiry. Our team will get back to you soon.</p>
              <p>Regards,<br/>Team SquadXP</p>
            `,
                    });
                    console.log("User email sent in background");

                    // Admin email(s)
                    const adminEmails = (process.env.ADMIN_EMAILS || "")
                        .split(",")
                        .map((e) => e.trim())
                        .filter(Boolean);

                    if (adminEmails.length > 0) {
                        await strapi.plugin("email").service("email").send({
                            to: adminEmails,
                            subject: "New Enquiry Received",
                            html: `
                <h2>New Enquiry Details</h2>
                <p><strong>Name:</strong> ${body.fullName}</p>
                <p><strong>Profile:</strong> ${body.profile || "-"}</p>
                <p><strong>Email:</strong> ${body.email}</p>
                <p><strong>Phone:</strong> +${body.countryCode} ${body.phoneNo}</p>
                <p><strong>Company:</strong> ${body.company || "-"}</p>
                <p><strong>Inquiry Type:</strong> ${body.inquiryType}</p>
                <p><strong>Industry:</strong> ${body.industry}</p>
                <p><strong>Enquiry Source:</strong> ${body.enquirySource}</p>
                <p><strong>Message:</strong> ${body.message || "-"}</p>
              `,
                        });
                        console.log("Admin email sent in background");
                    }

                } catch (err) {
                    console.error("Background Task Error:", err);
                }
            });

            // ----------------------------------------------------
            // No need to return anything here — it's already done
            // ----------------------------------------------------

        } catch (error) {
            console.error("Enquiry Submission Error:", error);
            return ctx.badRequest("Something went wrong", { error });
        }
    },
};
