import axios from 'axios'
import type { AxiosResponse, AxiosError } from 'axios'
interface UniteOrg {
  iduniteorg: number;
  iduoparente: number | null;
  nomuniteorg: string;
  descriptionuniteorg: string;
  bcache: number;
  codeordre: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: UniteOrg[];
}

let g_devurl: string = ''
if (import.meta.env.DEV) {
    g_devurl = 'https://mygolux.lausanne.ch'    
}

export async function getUnitesOrgListe(jsonCriteres: string = '{}'): Promise<ApiResponse> {
    const pathurluniteorg: string = '/goeland/uniteorg/axios/'
    const urluol: string = `${g_devurl}${pathurluniteorg}uniteorg_liste.php`
    const params = new URLSearchParams([['jsoncriteres', jsonCriteres]])
    try {
        const response: AxiosResponse<ApiResponse> = await axios.get(urluol, { params })
        return response.data
    } catch (error) {
        return traiteAxiosError(error as AxiosError)
    }
}

function traiteAxiosError(error: AxiosError): ApiResponse {
    let msgErr: string = ''
    if (error.response) {
        msgErr = `${error.response.data}<br>${error.response.status}<br>${error.response.headers}`    
    } else if (error.request.responseText) {
        msgErr = error.request.responseText
    } else {
        msgErr = error.message
    }
    const respData: ApiResponse = {
        "success": false,
        "message": `ERREUR. ${msgErr}`,
    }
    return(respData)
}