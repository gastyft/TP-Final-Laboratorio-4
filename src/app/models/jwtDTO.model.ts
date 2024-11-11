export class jwtDto {
    token: string;
    type: string;
    nombreUsuario: string;
    authorities: string[];
    idEntidad:number;

    constructor( token: string, type: string, nombreUsuario: string, authorities:string[], idEntidad:number){

        this.token=token;
        this.type=type;
        this.nombreUsuario=nombreUsuario;
        this.authorities=authorities;
        this.idEntidad=idEntidad;
    }
}