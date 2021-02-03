import winston from 'winston';
import { loggerConfig } from '../config';


const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

export const logger = winston.createLogger({
  level: loggerConfig.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    customFormat
  ),
  transports: [new winston.transports.Console()]
});