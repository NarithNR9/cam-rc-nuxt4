export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid product ID' })
  }

  const { directusUrl, directusAdminToken } = useRuntimeConfig()

  if (!directusAdminToken) {
    throw createError({ statusCode: 500, statusMessage: 'Admin token not configured' })
  }

  // Get current views count
  const product = await $fetch<{ data: { views: number } }>(
    `${directusUrl}/items/products/${id}?fields=views`,
    { headers: { Authorization: `Bearer ${directusAdminToken}` } }
  )

  // Increment views
  await $fetch(`${directusUrl}/items/products/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${directusAdminToken}`,
      'Content-Type': 'application/json'
    },
    body: { views: (product.data.views || 0) + 1 }
  })

  return { success: true }
})
