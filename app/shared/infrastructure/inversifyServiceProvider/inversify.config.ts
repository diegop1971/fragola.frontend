import { Container } from "inversify";
import "reflect-metadata";
import type { ICartRepository } from "@app/frontoffice/cart/domain/interfaces/ICartRepository";
import CartRepository from "@app/frontoffice/cart/infrastructure/persistence/CartRepository";
import TYPES from "@app/shared/infrastructure/inversifyServiceProvider/types";

const container = new Container();
container.bind<ICartRepository>(TYPES.ICartRepository).to(CartRepository);

export default container;
