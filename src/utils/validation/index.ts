// Form validation utilities
export const required = (value: any): string | null => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return 'This field is required'
  }
  return null
}

export const email = (value: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (value && !emailRegex.test(value)) {
    return 'Please enter a valid email address'
  }
  return null
}

export const minLength = (min: number) => (value: string): string | null => {
  if (value && value.length < min) {
    return `Must be at least ${min} characters long`
  }
  return null
}

export const maxLength = (max: number) => (value: string): string | null => {
  if (value && value.length > max) {
    return `Must be no more than ${max} characters long`
  }
  return null
}

export const date = (value: string): string | null => {
  if (value && isNaN(Date.parse(value))) {
    return 'Please enter a valid date'
  }
  return null
}

export const futureDate = (value: string): string | null => {
  if (value && new Date(value) <= new Date()) {
    return 'Date must be in the future'
  }
  return null
}

export const pastDate = (value: string): string | null => {
  if (value && new Date(value) >= new Date()) {
    return 'Date must be in the past'
  }
  return null
}

export const number = (value: string): string | null => {
  if (value && isNaN(Number(value))) {
    return 'Please enter a valid number'
  }
  return null
}

export const positiveNumber = (value: string): string | null => {
  if (value && Number(value) <= 0) {
    return 'Must be a positive number'
  }
  return null
}

export const url = (value: string): string | null => {
  try {
    if (value) {
      new URL(value)
    }
    return null
  } catch {
    return 'Please enter a valid URL'
  }
}

// Combined validators
export const validateField = (value: any, validators: Array<(value: any) => string | null>): string | null => {
  for (const validator of validators) {
    const error = validator(value)
    if (error) return error
  }
  return null
}

export const validateForm = (data: Record<string, any>, rules: Record<string, Array<(value: any) => string | null>>): Record<string, string> => {
  const errors: Record<string, string> = {}
  
  for (const [field, validators] of Object.entries(rules)) {
    const error = validateField(data[field], validators)
    if (error) {
      errors[field] = error
    }
  }
  
  return errors
}
