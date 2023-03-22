const config = token => {
  return {
    headers: {
      Authorization: `Bearer ${token || ''}`,
      Accept: 'application/json'
    }
  }
}

export default config
