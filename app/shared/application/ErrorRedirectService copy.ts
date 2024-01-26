import { useRouter } from 'vue-router'

class ErrorRedirectService {
  private router

  constructor() {
    this.router = useRouter()
  }

  public async handleApiError(status: number): Promise<void> {
    switch (status) {
      case 404:
        this.router.push({ name: 'error404Admin' })
        break
        case 500:
          this.router.push({ name: 'error500Admin' })
          break
      case 503:
        this.router.push({ name: 'error503Admin' })
        break
    }
  }
}
export default ErrorRedirectService