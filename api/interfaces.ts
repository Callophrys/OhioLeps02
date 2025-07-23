
type RecordInput = {
  text: string;
  count: number;
}

type RecordRow = RecordInput & {
  id: number;
  syncedAt: string;
}

export {
  RecordInput,
  RecordRow
}
