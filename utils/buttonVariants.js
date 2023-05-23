function buttonVariants() {
  const colors = {
    primary: '#007bff',
    secondary: '#6c757d',
    text: '#007bff',
    disabled: '#ccc'
  }

  const hoverColors = {
    primary: '#0069d9',
    secondary: '#5a6268',
    text: '#007bff',
    disabled: '#ccc'
  }

  const backgrounds = {
    primary: colors.primary,
    secondary: colors.secondary,
    outlined: 'transparent',
    text: 'transparent',
    disabled: '#eee'
  }

  const borderStyles = {
    outlined: `2px solid ${colors.primary}`,
    text: 'none',
    disabled: 'none'
  }

  return {
    primary: {
      background: backgrounds.primary,
      color: '#fff',
      hoverBackground: hoverColors.primary,
      hoverColor: '#fff',
      disabledBackground: backgrounds.disabled,
      disabledColor: colors.disabled,
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      padding: '0.5rem 1rem',
      textTransform: 'uppercase'
    },
    secondary: {
      background: backgrounds.secondary,
      color: '#fff',
      hoverBackground: hoverColors.secondary,
      hoverColor: '#fff',
      disabledBackground: backgrounds.disabled,
      disabledColor: colors.disabled,
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      padding: '0.5rem 1rem',
      textTransform: 'uppercase'
    },
    outlined: {
      background: backgrounds.outlined,
      color: colors.text,
      hoverBackground: backgrounds.primary,
      hoverColor: '#fff',
      disabledBackground: backgrounds.disabled,
      disabledColor: colors.disabled,
      border: borderStyles.outlined,
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      padding: '0.5rem 1rem',
      textTransform: 'uppercase'
    },
    text: {
      background: backgrounds.text,
      color: colors.text,
      hoverBackground: backgrounds.primary,
      hoverColor: '#fff',
      disabledBackground: backgrounds.disabled,
      disabledColor: colors.disabled,
      border: borderStyles.text,
      borderRadius: 'none',
      cursor: 'pointer',
      fontWeight: 'normal',
      padding: '0',
      textTransform: 'none'
    },
    disabled: {
      background: backgrounds.disabled,
      color: colors.disabled,
      hoverBackground: backgrounds.disabled,
      hoverColor: colors.disabled,
      disabledBackground: backgrounds.disabled,
      disabledColor: colors.disabled,
      border: borderStyles.disabled,
      borderRadius: '4px',
      cursor: 'not-allowed',
      fontWeight: 'bold',
      padding: '0.5rem 1rem',
      textTransform: 'uppercase'
    }
  }
}
