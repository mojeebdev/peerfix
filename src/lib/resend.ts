import { Resend } from "resend"

export const resend = new Resend(process.env.RESEND_API_KEY!)

export async function sendExpertApprovedEmail(email: string, name: string) {
  return resend.emails.send({
    from: "PeerFix <no-reply@peerfix.dev>",
    to: email,
    subject: "You're approved as a PeerFix expert",
    html: `<p>Hey ${name}, your expert application has been approved. Start fixing problems at <a href="https://peerfix.dev/expert">peerfix.dev/expert</a></p>`,
  })
}

export async function sendProblemSolvedEmail(email: string, problemTitle: string) {
  return resend.emails.send({
    from: "PeerFix <no-reply@peerfix.dev>",
    to: email,
    subject: "Your problem has been solved",
    html: `<p>Good news — your problem "<strong>${problemTitle}</strong>" has been marked as solved on PeerFix.</p>`,
  })
}
