import { describe, expect, it } from "vitest";
import { hasOfferCapacity, isOfferAvailable } from "./remaining-capacity";

describe("server-provided remaining capacity", () => {
    it("shows an offer with positive server-calculated capacity", () => {
        expect(isOfferAvailable({ executed: false, remainingCapacity: "25.5" })).toBe(true);
        expect(hasOfferCapacity({ executed: false, remainingCapacity: "25.5" }, 25)).toBe(true);
    });

    it("hides exhausted, malformed, and executed offers", () => {
        expect(isOfferAvailable({ executed: false, remainingCapacity: 0 })).toBe(false);
        expect(isOfferAvailable({ executed: false, remainingCapacity: "not-a-number" })).toBe(false);
        expect(isOfferAvailable({ executed: true, remainingCapacity: "25" })).toBe(false);
        expect(hasOfferCapacity({ executed: false, remainingCapacity: "25.5" }, 26)).toBe(false);
    });

    it("keeps legacy responses usable while the server remains authoritative", () => {
        expect(isOfferAvailable({ executed: false })).toBe(true);
        expect(hasOfferCapacity({ executed: false }, 1)).toBe(true);
        expect(hasOfferCapacity({ executed: false }, Number.NaN)).toBe(false);
    });
});
