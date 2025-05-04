export function addTrailingSlash(value: string) {
  if (!value) {
    return "/"
  }

  const hasSlash = value.charAt(value.length - 1) === "/"

  if (hasSlash) {
    return value
  }

  return value + "/"
}

export function removeTrailingSlash(value: string) {
  if (!value) {
    return ""
  }

  const hasSlash = value.charAt(value.length - 1) === "/"

  if (hasSlash) {
    return value.slice(0, -1)
  }

  return value
}

export function addUrlPath(url: string, path: string) {
  if (!url) {
    throw new Error("no url given to add path")
  } else if (!path) {
    return url
  }

  if (path.charAt(0) === "/") {
    return removeTrailingSlash(url) + path
  } else {
    return addTrailingSlash(url) + path
  }
}