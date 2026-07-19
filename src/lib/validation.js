// ---------------------------------------------------------------------------
// Field validation rules for the details form.
//
// Each validator returns an error string when invalid, or '' when valid.
// Validation runs live as the user types (see DetailsForm).
// ---------------------------------------------------------------------------

// Letters (incl. accented), spaces, hyphens and apostrophes — no digits.
const NAME_RE = /^[\p{L}\s'-]+$/u
// Pragmatic email shape: something@something.tld
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// German mobile national part: digits, spaces, hyphens; 6–13 digits total.
const PHONE_DIGITS_RE = /^\d[\d\s-]*$/
// German postcode: exactly 5 digits.
const POSTCODE_RE = /^\d{5}$/

export function validateField(name, value) {
  const v = (value ?? '').trim()

  switch (name) {
    case 'firstName':
    case 'lastName': {
      if (!v) return 'Required'
      if (!NAME_RE.test(v)) return 'Letters only — no numbers'
      if (v.length < 2) return 'Too short'
      return ''
    }
    case 'email': {
      if (!v) return 'Required'
      if (!EMAIL_RE.test(v)) return 'Enter a valid email, e.g. name@email.de'
      return ''
    }
    case 'phone': {
      if (!v) return 'Required'
      if (!PHONE_DIGITS_RE.test(v)) return 'Digits only'
      const digits = v.replace(/\D/g, '')
      if (digits.length < 6 || digits.length > 13) return 'Enter a valid mobile number'
      return ''
    }
    case 'address': {
      if (!v) return 'Required'
      if (v.length < 4) return 'Enter a full street address'
      return ''
    }
    case 'city': {
      if (!v) return 'Required'
      if (!NAME_RE.test(v)) return 'Letters only'
      return ''
    }
    case 'postcode': {
      if (!v) return 'Required'
      if (!POSTCODE_RE.test(v)) return 'Enter a 5-digit postcode'
      return ''
    }
    default:
      return ''
  }
}

// Validates the whole form; returns an { field: error } map (only non-empty).
export function validateAll(form) {
  const errors = {}
  for (const key of ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postcode']) {
    const err = validateField(key, form[key])
    if (err) errors[key] = err
  }
  return errors
}
