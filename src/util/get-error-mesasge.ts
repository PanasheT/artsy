export default function getErrorMessage(err: any): string {
  return err?.message ?? `${err}`;
}
