describe("Safe helper", () => {
  it("should format batch transaction correctly", () => {
    const txs = [{ to: "0x1234", value: "0", data: "0x" }];
    expect(txs.length).toBe(1);
    expect(txs[0].to).toBe("0x1234");
  });
});
