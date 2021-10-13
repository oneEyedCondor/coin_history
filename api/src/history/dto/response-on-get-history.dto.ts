import { PaginationDto } from '../../shared/dto/pagination.dto';

class PriceHistory {
  readonly date: string;
  readonly price: number;
}

export class ResponseOnGetHistoryDto {
  readonly isError: boolean;
  readonly message: string;
  readonly objects: Array<PriceHistory>;
  readonly pagination: PaginationDto;
}
