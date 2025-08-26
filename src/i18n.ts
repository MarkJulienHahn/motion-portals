export const revalidate = 0;

import {notFound} from "next/navigation";
import {getRequestConfig} from 'next-intl/server';
import { createTranslator } from "next-intl"
 
// Can be imported from a shared config
const locales = ['en', 'de'];
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();
 
  return {
    // messages: (await import(`../messages/${locale}.json`)).default
  };
});

// Helper function to load messages
export async function getMessages(locale: string) {
  return (await import(`../messages/${locale}.json`)).default
  // return (await import(`../../messages/${locale}.json`)).default
}

export async function getTranslator(locale: string) {
  const messages = await getMessages(locale)
  return createTranslator({ locale, messages })
}