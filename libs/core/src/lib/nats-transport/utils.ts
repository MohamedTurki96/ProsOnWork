import { JsMsg, Msg } from "nats"

// Names in nats (e.g. for durable consumers) cannot contain special characters like '.'.
export function sanitizeSubjectName(subject: string) {
  return subject.replace(/\./g, "-").replace(/\*/g, "ALL").replace(/>/g, "REST")
}

// Checks if the given subject matches the given pattern.
// See https://docs.nats.io/nats-concepts/subjects
export function matchSubject(pattern: string, subject: string) {
  if (pattern === subject) {
    return true
  }

  const patternParts = pattern.split(".")
  const subjectParts = subject.split(".")

  if (patternParts.length > subjectParts.length) {
    return false
  }

  for (let i = 0; i < patternParts.length; i++) {
    const patternPart = patternParts[i]
    const subjectPart = subjectParts[i]
    const isLastPatternPart = i === patternParts.length - 1
    const isLastSubjectPart = i === subjectParts.length - 1

    if (patternPart === "*" || patternPart === subjectPart) {
      if (isLastPatternPart && isLastSubjectPart) {
        return true
      }
      continue
    }

    if (patternPart === ">") {
      if (!isLastPatternPart) {
        throw new Error("The > wildcard must be the last part of the subject")
      }
      return true
    }

    // Patterns did not match, don't check further
    break
  }

  return false
}

export function isJetStreamMsg(m: Msg | JsMsg): m is JsMsg {
  return "seq" in m
}

export function getMessageInfo(m: Msg | JsMsg) {
  let payload
  try {
    payload = m.json()
  } catch {
    payload = m.string()
  }

  return {
    stream: isJetStreamMsg(m) ? m.info.stream : undefined,
    consumer: isJetStreamMsg(m) ? m.info.consumer : undefined,
    subject: m.subject,
    payload,
    headers: m.headers,
  }
}
