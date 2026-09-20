import os

from flask import Blueprint, jsonify, request, send_file
from report_generators.gen_reports import plot_asset_class_totals
from report_generators.gen_reports import plot_weekly_trend

report_controller = Blueprint(
    "report_controller",
    __name__
)


@report_controller.route(
    "/api/reports/assetClassTotals",
    methods=["GET", "POST"]
)
def get_asset_class_totals():

    if request.method == "POST":
        # Generate the requested report
    
        report = plot_asset_class_totals()

        return jsonify({
            "reportId": report.report_id,
            "reportType": "assetClassTotals"
        }), 201
        
    if request.method == "GET":

        return get_report_image(
            "asset_class_totals"
        )


@report_controller.route(
    "/api/reports/weeklyTrends",
    methods=["GET", "POST"]
)
def get_weekly_trend():

    if request.method == "POST":
        # Generate the requested report
    
        report = plot_weekly_trend()

        return jsonify({
            "reportId": report.report_id,
            "reportType": "weekly_trend"
        }), 201
        
    if request.method == "GET":

        return get_report_image(
            "weekly_trend"
        )
        
def get_report_image(report_id):

    report_path = os.path.join(
        "report_generators",
        f"{report_id}.png"
    )

    if not os.path.exists(report_path):
        return jsonify({
            "message": "Report not found"
        }), 404

    response = send_file(
        report_path,
        mimetype="image/png"
    )
        
    response.headers["Cache-Control"] = "no-store"
    return response