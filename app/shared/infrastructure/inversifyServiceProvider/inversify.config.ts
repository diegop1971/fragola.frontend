import { Container } from "inversify";
import type { ICartRepository } from "@app/frontoffice/cart/domain/interfaces/ICartRepository";
import AxiosCartRepository from "@app/frontoffice/cart/infrastructure/persistence/AxiosCartRepository";
import type { IAuthRepository } from "@app/frontoffice/auth/domain/interfaces/IAuthRepository";
import { AxiosAuthRepository } from "@app/frontoffice/auth/infrastructure/persistence/AxiosAuthRepository";
import TYPES from "@app/shared/infrastructure/inversifyServiceProvider/types";

const container = new Container();
container.bind<ICartRepository>(TYPES.ICartRepository).to(AxiosCartRepository);
container.bind<IAuthRepository>(TYPES.IAuthRepository).to(AxiosAuthRepository);

export default container;
