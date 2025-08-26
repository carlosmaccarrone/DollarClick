export class DollarApiLogic {
  private fallbackRate = 1400;

  constructor(private fetcher: () => Promise<{ venta?: number }>) {}

  async getDollarRate(): Promise<number> {
    try {
      const data = await this.fetcher();
      return data.venta ?? this.fallbackRate;
    } catch {
      return this.fallbackRate;
    }
  }
}

describe('DollarApiLogic', () => {
  it('should return venta value from fetcher', async () => {
    const logic = new DollarApiLogic(async () => ({ venta: 1500 }));
    const rate = await logic.getDollarRate();
    expect(rate).toBe(1500);
  });

  it('should return fallback if fetcher fails', async () => {
    const logic = new DollarApiLogic(async () => { throw new Error('fail'); });
    const rate = await logic.getDollarRate();
    expect(rate).toBe(1400);
  });

  it('should return fallback if venta is undefined', async () => {
    const logic = new DollarApiLogic(async () => ({ venta: undefined }));
    const rate = await logic.getDollarRate();
    expect(rate).toBe(1400);
  });
});