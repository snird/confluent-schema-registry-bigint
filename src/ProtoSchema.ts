import { Schema, ConfluentSchema, ProtoOptions } from './@types'
import protobuf from 'protobufjs'
import { IParserResult, ReflectionObject, Namespace, Type } from 'protobufjs/light'

export default class ProtoSchema implements Schema {
  private message: Type

  constructor(schema: ConfluentSchema, opts?: ProtoOptions) {
    const parsedMessage = protobuf.parse(schema.schemaString)
    const root = parsedMessage.root
    this.message = root.lookupType(this.getTypeName(parsedMessage, opts))
  }

  private getNestedTypeName(parent: { [k: string]: ReflectionObject } | undefined): string {
    if (!parent) throw Error('no nested fields')
    const keys = Object.keys(parent)
    const reflection = parent[keys[0]]
    if (reflection instanceof Namespace && reflection.nested)
      return this.getNestedTypeName(reflection.nested)
    return keys[0]
  }

  private getTypeName(parsedMessage: IParserResult, opts?: ProtoOptions): string {
    const root = parsedMessage.root
    const pkg = parsedMessage.package
    const name = opts && opts.messageName ? opts.messageName : this.getNestedTypeName(root.nested)
    return `${pkg ? pkg + '.' : ''}.${name}`
  }

  private trimStart(buffer: Buffer): Buffer {
    const index = buffer.findIndex((value: number) => value != 0)
    return buffer.slice(index)
  }

  public toBuffer(payload: object): Buffer {
    let errMsg
    if (
      !this.isValid(payload, {
        errorHook: (path: Array<string>) => {
          errMsg = path[0]
        },
      })
    ) {
      throw Error(errMsg)
    }

    const protoPayload = this.message.create(payload)
    return Buffer.from(this.message.encode(protoPayload).finish())
  }

  public fromBuffer(buffer: Buffer): any {
    const newBuffer = this.trimStart(buffer)
    return this.message.decode(newBuffer)
  }

  public isValid(
    payload: object,
    opts?: { errorHook: (path: Array<string>, value: any, type?: any) => void },
  ): boolean {
    const errMsg: null | string = this.message.verify(payload)
    if (errMsg) {
      if (opts?.errorHook) {
        opts.errorHook([errMsg], payload)
      }
      return false
    }
    return true
  }
}
