import Controller from "../../core/controller";
import { EventsService } from "./events.service";
import App from "../../app";
import { NextFunction, Request, Response } from "express";

class EventController extends Controller {
    public path = '/events';
    private eventsService: EventsService;

    constructor(app: App) {
        super();
        this.intializeRoutes();
        this.eventsService = new EventsService(app);
    }

    public intializeRoutes() {
        this.router.get(this.path.concat('/warmupevents'), this.getWarmupEvents.bind(this));
        this.router.get(this.path.concat('/events'), this.getEventsWithWorkshops.bind(this));
        this.router.get(this.path.concat('/futureevents'), this.getFutureEventWithWorkshops.bind(this));
    }

    async getWarmupEvents(req: Request, res: Response, next: NextFunction) {
        return await this.eventsService.getWarmupEvents()
          .then((data) => {
              res.json(data);
          })
          .catch((e: Error) => {
              next(e);
          });
    }

    async getEventsWithWorkshops(req: Request, res: Response, next: NextFunction) {
        return await this.eventsService.getEventsWithWorkshops(req,res)
          .then((data) => {
              res.json(data);
          })
          .catch((e: Error) => {
              next(e);
          });
    }

    async getFutureEventWithWorkshops(req: Request, res: Response, next: NextFunction) {
        return await this.eventsService.getFutureEventWithWorkshops(req, res)
          .then((data) => {
              res.json(data);
          })
          .catch((e: Error) => {
            next(e);
        });
    }
}

export default EventController;
