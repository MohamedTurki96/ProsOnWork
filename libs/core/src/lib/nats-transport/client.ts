import {  Inject } from "@nestjs/common"
import { ClientProxy, ReadPacket, WritePacket } from "@nestjs/microservices"
import {
  connect,
  ConnectionOptions,
  headers,
  JSONCodec,
  NatsConnection,
} from "nats"

import { NATS_CONNECTION_OPTIONS } from "./constants"

export class NatsClient extends ClientProxy {
  private nc?: NatsConnection
  private codec = JSONCodec()

  constructor(
    @Inject(NATS_CONNECTION_OPTIONS) private options: ConnectionOptions,
  ) {
    super()
  }

  async connect() {
    if (!this.nc) {
      this.nc = await connect(this.options)
    }
  }

  async close() {
    await this.nc?.drain()
    this.nc = undefined
  }

  // Publish a packet (request -> response)
  protected publish(
    packet: ReadPacket,
    callback: (packet: WritePacket) => void
  ): () => void {
    const subject = this.normalizePattern(packet.pattern)
    const h = headers()
    const payload = this.codec.encode(packet.data)
    const timeout = 5000

    this.nc
      ?.request(subject, payload, { headers: h, timeout })
      .then((msg) => this.codec.decode(msg.data) as WritePacket)
      .then((packet) => callback(packet))
      .catch((err) => {
        callback({ err })
      })
     
    return () => null
  }

  // Dispatch an event (fire and forget)
  protected async dispatchEvent(packet: ReadPacket): Promise<any> {
    const subject = this.normalizePattern(packet.pattern)
    const h = headers()
    const payload = this.codec.encode(packet.data)

    this.nc?.publish(subject, payload, { headers: h })
  }
}
