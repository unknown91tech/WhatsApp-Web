
export interface WhatsAppWebhookPayload {
  payload_type: 'whatsapp_webhook';
  _id: string;
  metaData: {
    entry: Array<{
      changes: Array<{
        field: string;
        value: {
          messaging_product: string;
          metadata: {
            display_phone_number: string;
            phone_number_id: string;
          };
          contacts?: Array<{
            profile: {
              name: string;
            };
            wa_id: string;
          }>;
          messages?: Array<{
            from: string;
            id: string;
            timestamp: string;
            text?: {
              body: string;
            };
            type: string;
          }>;
          statuses?: Array<{
            conversation?: {
              id: string;
              origin: {
                type: string;
              };
              expiration_timestamp?: string;
            };
            gs_id?: string;
            id: string;
            meta_msg_id?: string;
            pricing?: {
              billable: boolean;
              category: string;
              pricing_model: string;
              type: string;
            };
            recipient_id: string;
            status: 'sent' | 'delivered' | 'read';
            timestamp: string;
          }>;
        };
      }>;
      id: string;
    }>;
    gs_app_id: string;
    object: string;
    startedAt?: string;
    completedAt?: string;
    executed?: boolean;
  };
  createdAt?: string;
  startedAt?: string;
  completedAt?: string;
  executed?: boolean;
}