"use client";
import { IntlProvider } from "react-intl";
import { WritingPad } from "./_components/writingPad/writingPad";
import intlMessages from "~/app/_i18n";

const locale = "en";

export default function Home() {
  return (
    <IntlProvider locale={locale} messages={intlMessages[locale]}>
      <main className="flex items-center justify-center p-4">
        <div className="flex w-full max-w-3xl flex-col">
          <WritingPad />
        </div>
      </main>
    </IntlProvider>
  );
}
