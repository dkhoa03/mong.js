const { spawn } = require("child_process");
const { readFileSync } = require("fs-extra");
const http = require("http");
const axios = require("axios");
const semver = require("semver");
const logger = require("./utils/log");
////////////////////////////////////////////
//========= Check node.js version =========//
/////////////////////////////////////////////

// const nodeVersion = semver.parse(process.version);
// if (nodeVersion.major < 13) {
//     logger(`Your Node.js ${process.version} is not supported, it required Node.js 13 to run bot!`, "error");
//     return process.exit(0);
// };

///////////////////////////////////////////////////////////
//========= Create website for dashboard/uptime =========//
///////////////////////////////////////////////////////////

const dashboard = http.createServer(function (_req, res) {
    res.writeHead(200, "OK", { "Content-Type": "text/plain" });
    res.write("Xin Chào Admin Trương Đăng Khoa =))");
    res.end();
});

dashboard.listen(process.env.port || 0);

logger("Đang tiến hành khởi động...", "[ Khởi Động Bot ]");

/////////////////////////////////////////////////////////
//========= Create start bot and make it loop =========//
/////////////////////////////////////////////////////////

function startBot(message) {
    (message) ? logger(message, "[ Bắt Đầu ]") : "";

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "mirai.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close",async (codeExit) => {
      var x = 'codeExit'.replace('codeExit',codeExit);
        if (codeExit == 1) return startBot("Restarting...");
         else if (x.indexOf(2) == 0) {
           await new Promise(resolve => setTimeout(resolve, parseInt(x.replace(2,'')) * 1000));
                 startBot("Open ...");
       }
         else return; 
    });

    child.on("error", function (error) {
        logger("An error occurred: " + JSON.stringify(error), "[ Starting ]");
    });
};
////////////////////////////////////////////////
//========= Check update from Github =========//
////////////////////////////////////////////////
const chalk = require('chalkercli');
const chalk2 = require("chalk");

axios.get("https://raw.githubusercontent.com/d-jukie/miraiv2/main/package.json").then((res) => {
    logger(res['data']['name'], "[ Tên ]");
    logger("Version: " + res['data']['version'], "[ Phiên Bản ]");
    logger(res['data']['description'], "[ Mô Tả ]");
});

 const rainbow = chalk.rainbow(`
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*                                     *
*   ██╗░░██╗██╗░░██╗░█████╗░░█████╗░  *
*   ██║░██╔╝██║░░██║██╔══██╗██╔══██╗  *
*   █████═╝░███████║██║░░██║███████║  *
*   ██╔═██╗░██╔══██║██║░░██║██╔══██║  *
*   ██║░╚██╗██║░░██║╚█████╔╝██║░░██║  *
*   ╚═╝░░╚═╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝  *
*                                     *
*  Tên: Trương Đăng Khoa              *
*  Facebook:                          *
*  https://www.facebook.com/vince.buck*
*  Thắc mắc vui lòng liên hệ admin.   *
*  Hiện tại đang có 200 lệnh.         *
*                                     *
*                                     *
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`).stop();

rainbow.render();
const frame = rainbow.frame();
console.log(frame)
startBot();