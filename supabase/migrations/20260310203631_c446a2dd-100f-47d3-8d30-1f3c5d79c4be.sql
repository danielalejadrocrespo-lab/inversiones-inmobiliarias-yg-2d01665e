-- Replace the overly permissive policy with a more specific one
DROP POLICY "Anyone can insert contact messages" ON public.contact_messages;

CREATE POLICY "Anyone can insert contact messages with required fields"
  ON public.contact_messages FOR INSERT
  WITH CHECK (
    name IS NOT NULL AND name <> '' AND
    email IS NOT NULL AND email <> '' AND
    message IS NOT NULL AND message <> ''
  );