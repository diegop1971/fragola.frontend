import { useRouter } from 'vue-router'

class ErrorRedirectService {
  private router

  constructor() {
    this.router = useRouter()
  }

  public async handleApiError(status: number): Promise<void> {
    switch (status) {
      case 404:
        this.router.push('/404')
        break
      case 500:
        this.router.push({ name: 'error500' })
        break
    }
  }
}
export default ErrorRedirectService
