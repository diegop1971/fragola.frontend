import { useRouter } from 'vue-router'

class ErrorRedirectService {
  private router

  constructor() {
    this.router = useRouter()
  }

  public async handleApiError(status: number): Promise<void> {
    console.log(status)
    switch (status) {
      case 404:
        this.router.push({ name: 'error404' })
        break
      case 500:
        this.router.push({ name: 'error500' })
        break
    }
  }
}
export default ErrorRedirectService
