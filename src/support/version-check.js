module.exports = () => {
  const [major, minor, patch] = process.versions.node.split('.').map(parseFloat)
  if (major < 7 || (major === 7 && minor <= 5)) {
    console.log(`👎🏻 Node version is older than required: ${major}.${minor}.${patch}`)
    console.log('🍦 For ultimate goodness, install v8.12.0 or greater.')
    process.exit()
  } else {
    console.log(`🍦  Node version: v${major}.${minor}.${patch}`)
  }
}
