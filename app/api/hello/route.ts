export async function GET(request: Request) {
  return Response.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'kings-window-tint-frontend'
  })
}
