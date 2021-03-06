
import { injectable, inject } from "inversify";
import * as sequelize from 'sequelize';
import { MysqlConnection } from "../db/mysql.connection";



@injectable()
export class PodcastsSchema {




    static sym = Symbol(PodcastsSchema.name);
    private PodcastsSchema: PodcastsModel
    public getSchema() {
        return this.PodcastsSchema;
    }
    constructor(
        @inject((MysqlConnection.sym)) protected mysqlcon: MysqlConnection
    ) {

        const _att =
        {
            id: {
                type: sequelize.BIGINT(20),
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: sequelize.STRING(50),
                allowNull: false
            },
            description: {
                type: sequelize.STRING(2000),
                allowNull: false
            },
            link: {
                type: sequelize.STRING(1000),
                allowNull: false
            },
            created_at: {
                type: sequelize.TIME,
                allowNull: true
            },
            updated_at: {
                type: sequelize.TIME,
                allowNull: true
            },
        }
        this.PodcastsSchema = this.mysqlcon.getSequelize()
            .define<PodcastsInstance, PodcastsAttribute>('Podcasts', _att,
                {
                    tableName: 'podcasts',
                    timestamps: false,
                })

        // sync는 기존 데이터에 지대한 영향을 끼칠수 있으므로 사용하지 않는다.
    }
}

export interface PodcastsAttribute {
    id?: number;
    title?: string;
    description?: string;
    link?: string;
    created_at?: string;
    updated_at?: string;
}
export interface PodcastsInstance extends sequelize.Instance<PodcastsAttribute>, PodcastsAttribute {
}
export interface PodcastsModel extends sequelize.Model<PodcastsInstance, PodcastsAttribute> { }