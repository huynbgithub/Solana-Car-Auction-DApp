export type VehicleFactory = {
  "version": "0.1.0",
  "name": "vehicle_factory",
  "instructions": [
    {
      "name": "createVehicle",
      "accounts": [
        {
          "name": "vehicle",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "props",
          "type": {
            "defined": "VehicleProperties"
          }
        },
        {
          "name": "startingPrice",
          "type": "u128"
        },
        {
          "name": "vehicleImages",
          "type": {
            "vec": "string"
          }
        }
      ]
    },
    {
      "name": "approveVehicle",
      "accounts": [
        {
          "name": "vehicle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "setStart",
      "accounts": [
        {
          "name": "vehicle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "state",
          "type": "bool"
        }
      ]
    },
    {
      "name": "createBid",
      "accounts": [
        {
          "name": "vehicle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "toAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quantity",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "vehicleData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ownerAddress",
            "type": "publicKey"
          },
          {
            "name": "isStart",
            "type": "bool"
          },
          {
            "name": "isApproved",
            "type": "bool"
          },
          {
            "name": "props",
            "type": {
              "defined": "VehicleProperties"
            }
          },
          {
            "name": "startingPrice",
            "type": "u128"
          },
          {
            "name": "vehicleImages",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "bids",
            "type": {
              "vec": {
                "defined": "Bid"
              }
            }
          },
          {
            "name": "bidsSize",
            "type": "u32"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "VehicleProperties",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ownerFullName",
            "type": "string"
          },
          {
            "name": "seatCapacity",
            "type": "u16"
          },
          {
            "name": "firstRegistrationDate",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "Bid",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "index",
            "type": "u32"
          },
          {
            "name": "bidder",
            "type": "publicKey"
          },
          {
            "name": "quantity",
            "type": "u64"
          },
          {
            "name": "isWithdrawed",
            "type": "bool"
          }
        ]
      }
    }
  ]
};

export const IDL: VehicleFactory = {
  "version": "0.1.0",
  "name": "vehicle_factory",
  "instructions": [
    {
      "name": "createVehicle",
      "accounts": [
        {
          "name": "vehicle",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "props",
          "type": {
            "defined": "VehicleProperties"
          }
        },
        {
          "name": "startingPrice",
          "type": "u128"
        },
        {
          "name": "vehicleImages",
          "type": {
            "vec": "string"
          }
        }
      ]
    },
    {
      "name": "approveVehicle",
      "accounts": [
        {
          "name": "vehicle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "setStart",
      "accounts": [
        {
          "name": "vehicle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "state",
          "type": "bool"
        }
      ]
    },
    {
      "name": "createBid",
      "accounts": [
        {
          "name": "vehicle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "toAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quantity",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "vehicleData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ownerAddress",
            "type": "publicKey"
          },
          {
            "name": "isStart",
            "type": "bool"
          },
          {
            "name": "isApproved",
            "type": "bool"
          },
          {
            "name": "props",
            "type": {
              "defined": "VehicleProperties"
            }
          },
          {
            "name": "startingPrice",
            "type": "u128"
          },
          {
            "name": "vehicleImages",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "bids",
            "type": {
              "vec": {
                "defined": "Bid"
              }
            }
          },
          {
            "name": "bidsSize",
            "type": "u32"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "VehicleProperties",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ownerFullName",
            "type": "string"
          },
          {
            "name": "seatCapacity",
            "type": "u16"
          },
          {
            "name": "firstRegistrationDate",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "Bid",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "index",
            "type": "u32"
          },
          {
            "name": "bidder",
            "type": "publicKey"
          },
          {
            "name": "quantity",
            "type": "u64"
          },
          {
            "name": "isWithdrawed",
            "type": "bool"
          }
        ]
      }
    }
  ]
};
