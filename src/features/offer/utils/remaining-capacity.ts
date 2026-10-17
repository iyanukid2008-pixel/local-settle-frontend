import type { Offer } from "../models/offer";

/**
 * The API owns capacity accounting. Older API responses omit the field, so
 * keep those offers selectable and confirm their current state before trading.
 */
export function isOfferAvailable(offer: Pick<Offer, "executed" | "remainingCapacity">): boolean {
    if (offer.executed) return false;
    if (offer.remainingCapacity === undefined || offer.remainingCapacity === null) return true;

    const remaining = Number(offer.remainingCapacity);
    return Number.isFinite(remaining) && remaining > 0;
}

export function hasOfferCapacity(
    offer: Pick<Offer, "executed" | "remainingCapacity">,
    requestedAmount: number,
): boolean {
    if (offer.executed || !Number.isFinite(requestedAmount) || requestedAmount <= 0) return false;
    if (offer.remainingCapacity === undefined || offer.remainingCapacity === null) return true;

    const remaining = Number(offer.remainingCapacity);
    return Number.isFinite(remaining) && remaining >= requestedAmount;
}
