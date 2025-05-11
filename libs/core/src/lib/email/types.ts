export interface EmailTemplate {
  subject: string
  html?: string
  text?: string
}

export interface EmailAttachment {
  filename: string
  content?: Buffer
  href?: string
}

export interface SendMailOptions {
  recepient: string
  template: EmailTemplate
  templateValues?: Record<string, unknown>
  attachments?: EmailAttachment[]
}
