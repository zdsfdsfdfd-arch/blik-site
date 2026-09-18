import { Page } from '../components/layout/Page'
import { Button } from '../components/ui/Button'
import { TestPattern } from '../components/ui/TestPattern'

export function NotFoundPage() {
  return (
    <Page title="Страница не найдена" description="Такой страницы нет. Вернитесь на главную или посмотрите работы студии." noindex>
      <section className="container-x flex min-h-[100svh] flex-col justify-end pb-16 pt-32">
        <div className="grid-12 items-end gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <p className="label-mono text-signal">Ошибка 404 · нет сигнала</p>
            <h1 className="text-display-2xl mt-6">
              Кадр
              <br />
              не найден
            </h1>
            <p className="lead mt-8 max-w-md">Страница переехала или никогда не существовала. Проверьте адрес — или начните с работ студии.</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button to="/" variant="signal" arrow="right">
                На главную
              </Button>
              <Button to="/work" variant="outline" arrow="up-right">
                Смотреть работы
              </Button>
            </div>
          </div>
          <div className="col-span-12 aspect-video lg:col-span-5">
            <TestPattern label="404 · NO SIGNAL" />
          </div>
        </div>
      </section>
    </Page>
  )
}
