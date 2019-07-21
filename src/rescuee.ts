/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';

@Object()
export class Rescuee {

    @Property()
    public First_Name: string;
    @Property()
    public Last_Name: string;
    @Property()
    public Time_Stamp: string;
    @Property()
    public Latitude: string;
    @Property()
    public Longitude: string;

}
