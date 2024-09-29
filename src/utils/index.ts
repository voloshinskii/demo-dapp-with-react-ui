export interface IsBase64Options {
  allowEmpty?: boolean;
  mimeRequired?: boolean;
  allowMime?: boolean;
  paddingRequired?: boolean;
}

export function isBase64(v: any, opts: IsBase64Options = {}) {
  if (v instanceof Boolean || typeof v === 'boolean') {
    return false
  }

  if (opts.allowEmpty === false && v === '') {
    return false
  }

  var regex = '(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+\/]{3}=)?'
  var mimeRegex = '(data:\\w+\\/[a-zA-Z\\+\\-\\.]+;base64,)'

  if (opts.mimeRequired === true) {
    regex =  mimeRegex + regex
  } else if (opts.allowMime === true) {
    regex = mimeRegex + '?' + regex
  }

  if (opts.paddingRequired === false) {
    regex = '(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}(==)?|[A-Za-z0-9+\\/]{3}=?)?'
  }

  return (new RegExp('^' + regex + '$', 'gi')).test(v)
}
