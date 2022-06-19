export interface Where {
  where(col: string, op: string, val: unknown): Where;
  whereRef(col: string, op: string, ref: string): Where;
}
