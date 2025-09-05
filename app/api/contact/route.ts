"use server"

import { id } from "date-fns/locale"

type LdFormdata = {
  email: string
  notes: string
  option: string
}

export type TapiResponse = {
  message?: string
  error?: string
  data?: any
}

export async function sendCommunicationAction(idFormData: LdFormdata): Promise<TapiResponse> {
  const ldHeaders = new Headers({
    "Content-Type": "application/json",
    Cookie: "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=",
  })

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

  const { email, notes, option } = idFormData

  try {
    const LContactUrl =
      "https://qsgb.docker.localhost/api/method/erpnext.templates.utils.send_message"

    const LdPayload = {
      sender: email,
      message: notes,
      subject: `From Website - enquiry type : ${option}`,
    }

    const LdResponse = await fetch(LContactUrl, {
      method: "POST",
      headers: ldHeaders,
      redirect: "follow",
      body: JSON.stringify(LdPayload),
    })

    if (!LdResponse.ok) {
      const errorText = await LdResponse.text()
      return { error: errorText || "Request failed" }
    }

    const LdResult = await LdResponse.json()
    return {
      message: "Thank you for your message",
      data: LdResult,
    }
  } catch (error) {
    console.error("Server-side error:", error)
    return { error: "An error occurred, please try again later." }
  }
}
