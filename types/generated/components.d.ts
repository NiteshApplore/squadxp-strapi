import type { Schema, Struct } from '@strapi/strapi';

export interface BlogsFaqFaq extends Struct.ComponentSchema {
  collectionName: 'components_blogs_faq_faqs';
  info: {
    displayName: 'faq';
    icon: 'book';
  };
  attributes: {
    answer: Schema.Attribute.Text;
    question: Schema.Attribute.Text;
  };
}

export interface BlogsFaqSeoData extends Struct.ComponentSchema {
  collectionName: 'components_blogs_faq_seo_data';
  info: {
    displayName: 'seoData';
    icon: 'briefcase';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaKeywords: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTags: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CaseStudyChallenge extends Struct.ComponentSchema {
  collectionName: 'components_case_study_challenges';
  info: {
    displayName: 'challenge';
    icon: 'connector';
  };
  attributes: {
    contentArray: Schema.Attribute.Component<
      'case-study.image-content-container',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface CaseStudyClientSnapshot extends Struct.ComponentSchema {
  collectionName: 'components_case_study_client_snapshots';
  info: {
    displayName: 'ClientSnapshot';
    icon: 'discuss';
  };
  attributes: {
    companyName: Schema.Attribute.String & Schema.Attribute.Required;
    content: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    IndustryRegion: Schema.Attribute.Text & Schema.Attribute.Required;
    size: Schema.Attribute.Integer;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CaseStudyFrontendContainer extends Struct.ComponentSchema {
  collectionName: 'components_case_study_frontend_containers';
  info: {
    displayName: 'frontendContainer';
    icon: 'crown';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface CaseStudyImageContentContainer extends Struct.ComponentSchema {
  collectionName: 'components_case_study_image_content_containers';
  info: {
    displayName: 'imageContentContainer';
    icon: 'shoppingCart';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
  };
}

export interface CaseStudyMetricsContainer extends Struct.ComponentSchema {
  collectionName: 'components_case_study_metrics_containers';
  info: {
    displayName: 'metricsContainer';
  };
  attributes: {
    description: Schema.Attribute.Text;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    percentage: Schema.Attribute.Decimal & Schema.Attribute.Required;
  };
}

export interface CaseStudyTitleContentContainer extends Struct.ComponentSchema {
  collectionName: 'components_case_study_title_content_containers';
  info: {
    displayName: 'titleImageContentContainer';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blogs-faq.faq': BlogsFaqFaq;
      'blogs-faq.seo-data': BlogsFaqSeoData;
      'case-study.challenge': CaseStudyChallenge;
      'case-study.client-snapshot': CaseStudyClientSnapshot;
      'case-study.frontend-container': CaseStudyFrontendContainer;
      'case-study.image-content-container': CaseStudyImageContentContainer;
      'case-study.metrics-container': CaseStudyMetricsContainer;
      'case-study.title-content-container': CaseStudyTitleContentContainer;
    }
  }
}
