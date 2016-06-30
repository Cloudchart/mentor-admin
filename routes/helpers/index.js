export function getFilteredAttrs(attrs, permittedAttrs) {
  let filteredAttrs = {}
  Object.keys(attrs).forEach(key => {
    if (permittedAttrs.includes(key)) filteredAttrs[key] = attrs[key]
  })
  return filteredAttrs
}
