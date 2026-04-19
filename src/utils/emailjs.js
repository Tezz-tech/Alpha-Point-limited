import emailjs from '@emailjs/browser'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

/**
 * Sends the contact form data via EmailJS.
 * @param {Object} data - { fullName, email, phone, service, message }
 * @returns {Promise}
 */
export async function sendEmail(data) {
  const templateParams = {
    from_name:    data.fullName,
    from_email:   data.email,
    from_phone:   data.phone,
    service_type: data.service,
    message:      data.message,
    to_email:     'alphapointnig@yahoo.com',
  }

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
}
