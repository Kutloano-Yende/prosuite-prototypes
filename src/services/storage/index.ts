import { APP_CONFIG } from '../../constants/config'

// Generic storage service
export class StorageService {
  private static isClient(): boolean {
    return typeof window !== 'undefined'
  }

  static get<T>(key: string, defaultValue: T): T {
    if (!this.isClient()) return defaultValue

    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`Error reading from localStorage for key "${key}":`, error)
      return defaultValue
    }
  }

  static set<T>(key: string, value: T): void {
    if (!this.isClient()) return

    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error writing to localStorage for key "${key}":`, error)
    }
  }

  static remove(key: string): void {
    if (!this.isClient()) return

    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing from localStorage for key "${key}":`, error)
    }
  }

  static clear(): void {
    if (!this.isClient()) return

    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  }
}

// Specific storage services
export class PolicyStorage {
  private static readonly KEY = APP_CONFIG.storage.capturedPolicies

  static getAll(): any[] {
    return StorageService.get(this.KEY, [])
  }

  static add(policy: any): void {
    const policies = this.getAll()
    policies.push({
      ...policy,
      id: `policy_${Date.now()}`,
      createdAt: new Date().toISOString()
    })
    StorageService.set(this.KEY, policies)
  }

  static update(id: string, updates: Partial<any>): void {
    const policies = this.getAll()
    const index = policies.findIndex(p => p.id === id)
    if (index !== -1) {
      policies[index] = { ...policies[index], ...updates, updatedAt: new Date().toISOString() }
      StorageService.set(this.KEY, policies)
    }
  }

  static remove(id: string): void {
    const policies = this.getAll()
    const filtered = policies.filter(p => p.id !== id)
    StorageService.set(this.KEY, filtered)
  }

  static clear(): void {
    StorageService.remove(this.KEY)
  }
}

export class ObligationStorage {
  private static readonly KEY = APP_CONFIG.storage.capturedObligations

  static getAll(): any[] {
    return StorageService.get(this.KEY, [])
  }

  static add(obligation: any): void {
    const obligations = this.getAll()
    obligations.push({
      ...obligation,
      id: `obligation_${Date.now()}`,
      createdAt: new Date().toISOString()
    })
    StorageService.set(this.KEY, obligations)
  }

  static update(id: string, updates: Partial<any>): void {
    const obligations = this.getAll()
    const index = obligations.findIndex(o => o.id === id)
    if (index !== -1) {
      obligations[index] = { ...obligations[index], ...updates, updatedAt: new Date().toISOString() }
      StorageService.set(this.KEY, obligations)
    }
  }

  static remove(id: string): void {
    const obligations = this.getAll()
    const filtered = obligations.filter(o => o.id !== id)
    StorageService.set(this.KEY, filtered)
  }

  static clear(): void {
    StorageService.remove(this.KEY)
  }
}

export class UserPreferencesStorage {
  private static readonly KEY = APP_CONFIG.storage.userPreferences

  static get(): any {
    return StorageService.get(this.KEY, {
      theme: 'light',
      language: 'en',
      dateFormat: 'MMM dd, yyyy',
      timezone: 'UTC'
    })
  }

  static set(preferences: any): void {
    StorageService.set(this.KEY, preferences)
  }

  static update(updates: Partial<any>): void {
    const current = this.get()
    this.set({ ...current, ...updates })
  }
}
