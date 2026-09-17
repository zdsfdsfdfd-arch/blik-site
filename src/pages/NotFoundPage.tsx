import { Page } from '../components/layout/Page'
import { Button } from '../components/ui/Button'

export function NotFoundPage() {
  return (
    <Page title="Страница не найдена" className="pt-28 md:pt-40">
      <section className="container-x flex min-h-[60vh] flex-col items-start justify-center pb-24">
        <p className="eyebrow text-muted">Ошибка 404</p>
        <h1 className="text-display-xl mt-5">
          Кажется, вы <span className="serif-accent text-ocean">сошли с маршрута.</span>
        </h1>
        <p className="lead mt-6 max-w-lg">
          Такой страницы нет. Но есть 120 стран, из которых можно выбрать следующую точку.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button to="/" variant="primary" size="lg">
            На главную
          </Button>
          <Button to="/tours" variant="outline" size="lg" arrow="right">
            Смотреть туры
          </Button>
        </div>
      </section>
    </Page>
  )
}
