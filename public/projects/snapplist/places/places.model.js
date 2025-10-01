"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const PlaceSchema = new mongoose_1.default.Schema({
    fsq_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    geo: {
        lat: {
            type: Number,
            required: true
        },
        long: {
            type: Number,
            required: true
        }
    },
    location: {
        address: {
            type: String,
            required: true
        },
        locality: {
            type: String,
            required: true
        },
        postcode: {
            type: String,
            required: true
        },
        region: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    address: {
        type: String,
        required: true
    },
    neighborhood: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'Snapplist_Neighborhood'
    },
    categories: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: 'Snapplist_Category'
        }],
    rating: {
        type: Number
    },
    price: {
        type: Number
    },
    photos: [{
            fsq_id: {
                type: String
            },
            prefix: {
                type: String
            },
            suffix: {
                type: String
            },
            width: {
                type: Number
            },
            height: {
                type: Number
            }
        }]
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)('Snapplist_Place', PlaceSchema);
