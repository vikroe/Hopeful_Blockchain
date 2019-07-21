/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { Rescuee } from './rescuee';

@Info({title: 'RescueeContract', description: 'My Smart Contract' })
export class RescueeContract extends Contract {

    constructor() {
        super('org.rescueecontract');
    }

    @Transaction(false)
    @Returns('boolean')
    public async rescueeExists(ctx: Context, rescueeId: string): Promise<boolean> {
        const buffer = await ctx.stub.getState(rescueeId);
        return (!!buffer && buffer.length > 0);
    }

    @Transaction()
    public async createRescuee(ctx: Context, rescueeId: string): Promise<void> {
        const exists = await this.rescueeExists(ctx, rescueeId);
        if (exists) {
            throw new Error(`The rescuee ${rescueeId} already exists`);
        }
        const rescuee = new Rescuee();
        const buffer = Buffer.from(JSON.stringify(rescuee));
        await ctx.stub.putState(rescueeId, buffer);
    }

    @Transaction(false)
    @Returns('Rescuee')
    public async readRescuee(ctx: Context, rescueeId: string): Promise<Rescuee> {
        const exists = await this.rescueeExists(ctx, rescueeId);
        if (!exists) {
            throw new Error(`The rescuee ${rescueeId} does not exist`);
        }
        const buffer = await ctx.stub.getState(rescueeId);
        const rescuee = JSON.parse(buffer.toString()) as Rescuee;
        return rescuee;
    }

    @Transaction()
    public async updateRescuee(ctx: Context, rescueeId: string, First_Name: string,
        Last_Name: string, Time_Stamp: string, Longitude: string, Latitude: string): Promise<void> {
        const exists = await this.rescueeExists(ctx, rescueeId);
        if (!exists) {
            throw new Error(`The rescuee ${rescueeId} does not exist`);
        }
        const rescuee = new Rescuee();
        rescuee.First_Name = First_Name;
        rescuee.Last_Name = Last_Name;
        rescuee.Time_Stamp = Time_Stamp;
        rescuee.Longitude = Longitude;
        rescuee.Latitude = Latitude;
        const buffer = Buffer.from(JSON.stringify(rescuee));
        await ctx.stub.putState(rescueeId, buffer);
    }

    @Transaction()
    public async deleteRescuee(ctx: Context, rescueeId: string): Promise<void> {
        const exists = await this.rescueeExists(ctx, rescueeId);
        if (!exists) {
            throw new Error(`The rescuee ${rescueeId} does not exist`);
        }
        await ctx.stub.deleteState(rescueeId);
    }

}
