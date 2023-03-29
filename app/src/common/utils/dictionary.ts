export const dictionary = (text: string) => {
    switch (text) {
      case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
        return 'A senha deve ter pelo menos 6 caracteres'
      default:
        return 'Email inválido ou já existente'
    }
    
  }