import api from '@/config/axios'

class IncidentService {
  public fetchLatencyStatus = async (): Promise<boolean> => {
    const response = await api.get('/transaction/latency')
    if (response.status === 200) return response.data as boolean
    else return false
  }

  public fetchToggleLatency = async (): Promise<boolean> => {
    const response = await api.post('/transaction/toggle-latency')
    if (response.status === 200) return true
    else return false
  }
}

export const incidentService = new IncidentService()
