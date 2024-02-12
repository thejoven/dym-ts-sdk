import { IndexerSpotStreamTransformer } from '../transformers';
import { getGrpcIndexerWebImpl } from '../../base/BaseIndexerGrpcWebConsumer';
import { InjectiveSpotExchangeRpc } from '@injectivelabs/indexer-proto-ts';
import { GeneralException } from '@injectivelabs/exceptions';
/**
 * @category Indexer Grpc Stream
 */
export class IndexerGrpcSpotStream {
    client;
    constructor(endpoint) {
        this.client =
            new InjectiveSpotExchangeRpc.InjectiveSpotExchangeRPCClientImpl(getGrpcIndexerWebImpl(endpoint));
    }
    /** @deprecated - use streamSpotOrderbookV2 */
    streamSpotOrderbook(_args) {
        throw new GeneralException(new Error('deprecated - use streamDerivativeOrderbookV2'));
    }
    streamSpotOrders({ marketId, subaccountId, orderSide, callback, onEndCallback, onStatusCallback, }) {
        const request = InjectiveSpotExchangeRpc.StreamOrdersRequest.create();
        if (marketId) {
            request.marketId = marketId;
        }
        if (subaccountId) {
            request.subaccountId = subaccountId;
        }
        if (orderSide) {
            request.orderSide = orderSide;
        }
        const subscription = this.client.StreamOrders(request).subscribe({
            next(response) {
                callback(IndexerSpotStreamTransformer.ordersStreamCallback(response));
            },
            error(err) {
                if (onStatusCallback) {
                    onStatusCallback(err);
                }
            },
            complete() {
                if (onEndCallback) {
                    onEndCallback();
                }
            },
        });
        return subscription;
    }
    streamSpotOrderHistory({ marketId, subaccountId, orderTypes, executionTypes, direction, state, callback, onEndCallback, onStatusCallback, }) {
        const request = InjectiveSpotExchangeRpc.StreamOrdersHistoryRequest.create();
        if (subaccountId) {
            request.subaccountId = subaccountId;
        }
        if (marketId) {
            request.marketId = marketId;
        }
        if (orderTypes) {
            request.orderTypes = orderTypes;
        }
        if (direction) {
            request.direction = direction;
        }
        if (state) {
            request.state = state;
        }
        if (executionTypes) {
            request.executionTypes = executionTypes;
        }
        const subscription = this.client.StreamOrdersHistory(request).subscribe({
            next(response) {
                callback(IndexerSpotStreamTransformer.orderHistoryStreamCallback(response));
            },
            error(err) {
                if (onStatusCallback) {
                    onStatusCallback(err);
                }
            },
            complete() {
                if (onEndCallback) {
                    onEndCallback();
                }
            },
        });
        return subscription;
    }
    streamSpotTrades({ marketIds, marketId, subaccountIds, subaccountId, pagination, direction, executionSide, callback, onEndCallback, onStatusCallback, }) {
        const request = InjectiveSpotExchangeRpc.StreamTradesRequest.create();
        if (marketIds) {
            request.marketIds = marketIds;
        }
        if (marketId) {
            request.marketId = marketId;
        }
        if (subaccountIds) {
            request.subaccountIds = subaccountIds;
        }
        if (subaccountId) {
            request.subaccountId = subaccountId;
        }
        if (executionSide) {
            request.executionSide = executionSide;
        }
        if (direction) {
            request.direction = direction;
        }
        if (pagination) {
            if (pagination.skip !== undefined) {
                request.skip = pagination.skip.toString();
            }
            if (pagination.limit !== undefined) {
                request.limit = pagination.limit;
            }
        }
        const subscription = this.client.StreamTrades(request).subscribe({
            next(response) {
                callback(IndexerSpotStreamTransformer.tradesStreamCallback(response));
            },
            error(err) {
                if (onStatusCallback) {
                    onStatusCallback(err);
                }
            },
            complete() {
                if (onEndCallback) {
                    onEndCallback();
                }
            },
        });
        return subscription;
    }
    streamSpotMarket({ marketIds, callback, onEndCallback, onStatusCallback, }) {
        const request = InjectiveSpotExchangeRpc.StreamMarketsRequest.create();
        if (marketIds) {
            request.marketIds = marketIds;
        }
        const subscription = this.client.StreamMarkets(request).subscribe({
            next(response) {
                callback(response);
            },
            error(err) {
                if (onStatusCallback) {
                    onStatusCallback(err);
                }
            },
            complete() {
                if (onEndCallback) {
                    onEndCallback();
                }
            },
        });
        return subscription;
    }
    streamSpotOrderbookV2({ marketIds, callback, onEndCallback, onStatusCallback, }) {
        const request = InjectiveSpotExchangeRpc.StreamOrderbookV2Request.create();
        request.marketIds = marketIds;
        const subscription = this.client.StreamOrderbookV2(request).subscribe({
            next(response) {
                callback(IndexerSpotStreamTransformer.orderbookV2StreamCallback(response));
            },
            error(err) {
                if (onStatusCallback) {
                    onStatusCallback(err);
                }
            },
            complete() {
                if (onEndCallback) {
                    onEndCallback();
                }
            },
        });
        return subscription;
    }
    streamSpotOrderbookUpdate({ marketIds, callback, onEndCallback, onStatusCallback, }) {
        const request = InjectiveSpotExchangeRpc.StreamOrderbookUpdateRequest.create();
        request.marketIds = marketIds;
        const subscription = this.client.StreamOrderbookUpdate(request).subscribe({
            next(response) {
                callback(IndexerSpotStreamTransformer.orderbookUpdateStreamCallback(response));
            },
            error(err) {
                if (onStatusCallback) {
                    onStatusCallback(err);
                }
            },
            complete() {
                if (onEndCallback) {
                    onEndCallback();
                }
            },
        });
        return subscription;
    }
}
